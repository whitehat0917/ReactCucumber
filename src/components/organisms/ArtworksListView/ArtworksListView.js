/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import selectTableHOC from 'react-table/lib/hoc/selectTable';
import VisibilitySensor from 'react-visibility-sensor';
import EventListener, { withOptions } from 'react-event-listener';
import { throttle } from 'lodash';
import { getScrollOffsetBottom } from 'utils/common';
import ContentWrapper from 'atoms/ContentWrapper';
import Typography from 'atoms/Typography';
import Checkbox from 'atoms/Checkbox';
import Link from 'atoms/Link';
import ArtworkUID from 'molecules/ArtworkUID';
import NotesRenderer from 'molecules/NotesRenderer';
import PortfolioHeader from 'containers/PortfolioHeader';
import ArtworksViewSwitcher from 'containers/ArtworksViewSwitcher';
import Sorting from 'containers/Sorting';
import MinorLoader from 'atoms/MinorLoader';
import HeaderRenderer from 'atoms/TableHeaderRenderer';
import SimpleRenderer from 'atoms/TableCellRenderer';
import ConfirmationModal from 'molecules/ConfirmationModal';

import { CATEGORIES, STATUSES } from 'constants/artworks';

import 'react-table/react-table.css';

const SelectableTable = selectTableHOC(ReactTable);

const Dot = styled.div`
  width: 0.3125rem;
  height: 0.3125rem;
  background-color: ${({ theme }) => theme.palette.primary[30]};
  border-radius: 50%;
`;

const FlexColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: ${({ iswrap }) => (iswrap ? 'wrap' : 'unset')};
`;

const ImageWrapper = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  margin-right: 1rem;
`;

const YearColumnImage = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  object-fit: cover;
`;

const NoRowsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BulkOperationWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1.4rem;
  align-items: center;
  margin-top: -1.4rem;
`;

const ORIGINAL_PROPTYPES = PropTypes.shape({
  title: PropTypes.string,
  year: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({ tumbnails: PropTypes.object })),
  id: PropTypes.string.isRequired,
  category: PropTypes.number,
  sub_category: PropTypes.string,
  width: PropTypes.number,
  depth: PropTypes.number,
  height: PropTypes.number,
});

const YearColumnRenderer = ({ original }) => {
  const {
    title, year, images, id,
  } = original;
  const firstImage = images && images[0] ? images[0].thumbnails.tiny : null;
  return (
    <FlexColumnWrapper>
      <ImageWrapper>
        <YearColumnImage crossOrigin="" src={firstImage || ''} />
      </ImageWrapper>
      <div>
        <Typography type="body3" iswrap>{[title, year].filter((value) => value).join(', ')}</Typography>
        <ArtworkUID id={id} />
      </div>
    </FlexColumnWrapper>
  );
};
YearColumnRenderer.propTypes = {
  original: ORIGINAL_PROPTYPES,
};

const CategoryColumnRenderer = ({ original }) => {
  const { category, sub_category: subCategory } = original;
  const categoryName = CATEGORIES[category] || {};
  return (
    <div>
      <Typography type="body3" iswrap>{categoryName.label || ''}</Typography>
      <Typography type="small" color="muted" iswrap>{subCategory}</Typography>
    </div>
  );
};
CategoryColumnRenderer.propTypes = {
  original: ORIGINAL_PROPTYPES,
};

const SizeColumnRenderer = ({
  original: {
    width, depth, height, metric,
  },
}) => (
  <FlexColumnWrapper iswrap>
    { width ? <Typography type="body3">{Number(width).toFixed(1)}</Typography> : <Dot />}
    <Typography type="body3">{'\u00a0x\u00a0'}</Typography>
    { height ? <Typography type="body3">{Number(height).toFixed(1)}</Typography> : <Dot />}
    <Typography type="body3">{'\u00a0x\u00a0'}</Typography>
    { depth ? <Typography type="body3">{Number(depth).toFixed(1)}</Typography> : <Dot />}
    <Typography type="body3">{`\u00a0${metric === 2 ? 'in' : 'cm'}`}</Typography>
  </FlexColumnWrapper>
);
SizeColumnRenderer.propTypes = {
  original: ORIGINAL_PROPTYPES,
};

const SwitcherRenderer = () => <ArtworksViewSwitcher />;

const StyledTable = styled(SelectableTable)`
  cursor: pointer;

  .hdrLastColumn {
    padding-right: 0 !important;
    margin-left: 1rem;
    margin-right: -1rem;
  }

  .rt-tr {
    border-bottom: 1px solid rgba(177, 178, 179, 0.2);
  }

  .rt-thead .rt-tr {
    border-bottom: none;
  }

  .rt-tr-group:last-child .rt-tr {
    border-bottom: none;
  }

  .rt-tr-group:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: rgba(201, 203, 204, 0.2);
  }
`;

const NoDataComponent = () => (
  <NoRowsWrapper>
    <Typography style={{ textTransform: 'uppercase' }} color="muted" type="caption">
      No artworks found
    </Typography>
  </NoRowsWrapper>
);

const SelectInputComponent = ({
  id, checked, onClick, row,
}) => (
  <Checkbox
    checked={checked}
    onChange={(e) => { onClick(id, e.shiftKey, row); }}
  />
);

SelectInputComponent.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  row: PropTypes.object,
};

class ArtworksListView extends PureComponent {
  state = {
    selected: [],
  }

  columns = [
    {
      Header: () => <Sorting />,
      accessor: 'year',
      Cell: YearColumnRenderer,
      minWidth: 180,
    },
    {
      Header: (props) => <HeaderRenderer value="Category" {...props} />,
      accessor: 'category',
      Cell: CategoryColumnRenderer,
    },
    {
      Header: (props) => <HeaderRenderer value="Size" {...props} />,
      Cell: SizeColumnRenderer,
      minWidth: 130,
    },
    {
      Header: (props) => <HeaderRenderer value="Location" {...props} />,
      accessor: 'current_location',
      Cell: SimpleRenderer,
    },
    {
      Header: (props) => <HeaderRenderer value="Status" {...props} />,
      accessor: 'status',
      Cell: ({ value, ...props }) => (value ? <SimpleRenderer value={STATUSES[value] ? STATUSES[value].label : ''} {...props} /> : null),
      maxWidth: 100,
    },
    {
      Header: (props) => <HeaderRenderer value="Price" {...props} />,
      accessor: 'price',
      Cell: ({ value, ...props }) => (value ? <SimpleRenderer value={`$${Number(value).toFixed(2)}`} {...props} /> : null),
      minWidth: 100,
    },
    {
      Header: (props) => <HeaderRenderer value="Note" {...props} />,
      accessor: 'notes',
      Cell: ({ value }) => <NotesRenderer value={value} />,
      maxWidth: 50,
    },
    {
      Header: SwitcherRenderer,
      headerClassName: 'hdrLastColumn',
      minWidth: 40,
      maxWidth: 40,
    },
  ]

  handleScroll = throttle(() => {
    const offsetToBottom = getScrollOffsetBottom();
    const { requestArtworks, isFetching, artworksMeta } = this.props;
    if (!isFetching && artworksMeta.hasMore && offsetToBottom < window.innerHeight) {
      requestArtworks();
    }
  }, 500, { trailing: false });

  handleRowClick = (rowInfo) => {
    const { pushPage } = this.props;
    if (!rowInfo || !rowInfo.original || !rowInfo.original.id) return;
    pushPage(`/${rowInfo.original.id}/edit`);
  }

  handleLoadMore = (isVisible) => {
    const { requestArtworks, isFetching, artworksMeta } = this.props;
    if (!isFetching && isVisible && artworksMeta.hasMore) {
      requestArtworks();
    }
  }

  isSelected = (id) => this.state.selected.includes(id)

  toggleSelection = (id, isSelected, row) => {
    const { selected } = this.state;
    this.setState({
      selected: selected.includes(row.id)
        ? selected.filter((artworkId) => artworkId !== row.id)
        : [...selected, row.id],
    });
  }

  toggleAll = () => {
    const { artworks } = this.props;
    const { selected } = this.state;
    this.setState({
      selected: selected.length === artworks.length ? []
        : artworks.map((artwork) => artwork.id),
    });
  }
  handleBulkClick = () => {
    const {
      openConfirmModal,
      deleteMultipleArtworks
    } = this.props;

    openConfirmModal();
    deleteMultipleArtworks();
  }

  render() {
    const {
      artworks, artworksMeta, bulkActionStatus, closeConfirmModal, bulkAction
    } = this.props;
    const { selected } = this.state;
    return (
      <ContentWrapper withPaddings>
        <ConfirmationModal
          name="bulk_actions_confirm"
          title="Delete artworks"
          text={`Are you sure you want to delete those ${selected.length} artworks?`}
          confirmText="Delete"
          onCancel={closeConfirmModal}
          onSubmit={() => { bulkAction(selected, 'delete'); }}
          isLoading={bulkActionStatus.isLoading}
          data={{
            type: 'bulkActionsConfirmationModal',
          }}
        />
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(this.handleScroll, { passive: true, capture: false })}
        />
        <PortfolioHeader />
        <BulkOperationWrapper>
          {
            Boolean(selected.length)
            && (
            <Link
              style={{ marginLeft: '1rem' }}
              size="small"
              type="pseudo"
              onClick={this.handleBulkClick}
            >
              {`Delete (${selected.length})`}
            </Link>)
          }
        </BulkOperationWrapper>
        <StyledTable
          keyField="id"
          selectAll={artworks.length === selected.length}
          isSelected={this.isSelected}
          selectType="checkbox"
          toggleSelection={this.toggleSelection}
          toggleAll={this.toggleAll}
          data={artworks}
          columns={this.columns}
          showPagination={false}
          showPaginationBottom={false}
          showPageSizeOptions={false}
          pageSize={artworks.length}
          minRows={0}
          sortable={false}
          resizable={false}
          getProps={() => ({
            style: {
              border: 'none',
            },
          })}
          getTheadProps={() => ({
            style: {
              boxShadow: 'none',
              padding: '0 1rem',
            },
          })}
          getTheadThProps={() => ({
            style: {
              border: 'none',
              textAlign: 'start',
              padding: '0.325rem 1rem 0.325rem 0',
              outline: 0,
              lastChild: {
                marginLeft: '1rem',
                marginRight: '-1rem',
              },
            },
          })}
          getTbodyProps={() => ({
            style: {
              backgroundColor: artworks.length === 0 ? 'transparent' : 'white',
              borderRadius: '6px',
              padding: '5px 0',
            },
          })}
          getTrGroupProps={() => ({
            style: {
              padding: '0 1rem',
              border: 'none',
            },
          })}
          getTrProps={(state, rowInfo) => ({
            onClick: () => { this.handleRowClick(rowInfo); },
          })}
          getTdProps={() => ({
            style: {
              padding: '1rem 1rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
              borderRight: 'none',
              borderLeft: 'none',
            },
          })}
          NoDataComponent={NoDataComponent}
          SelectInputComponent={SelectInputComponent}
          SelectAllInputComponent={SelectInputComponent}
        />
        {
          artworksMeta.hasMore
          && (
            <VisibilitySensor onChange={this.handleLoadMore}>
              <div style={{ height: '30px', marginBottom: '10px' }}>
                <MinorLoader />
              </div>
            </VisibilitySensor>
          )
        }
      </ContentWrapper>
    );
  }
}

ArtworksListView.propTypes = {
  artworks: PropTypes.array.isRequired,
  pushPage: PropTypes.func.isRequired,
  openConfirmModal: PropTypes.func.isRequired,
  closeConfirmModal: PropTypes.func.isRequired,
  bulkAction: PropTypes.func.isRequired,
  bulkActionStatus: PropTypes.object,
};

export default ArtworksListView;
