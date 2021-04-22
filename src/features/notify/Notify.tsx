import React, { Fragment } from 'react';
import { v4 } from 'uuid';
import Typography from 'components/Typography';
import styled from 'styled-components';
import NotifyHolder from './NotifyHolder';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import Snackbar from 'components/Snackbar';
import { hideNotify, resetState } from './notifySlice';

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled((props) => <Typography color="white" {...props} />)`
  margin-right: 0.5rem;
`;

const RetryLink = styled((props) => <Typography color="white" weight="600" {...props} />)`
  margin-right: 0.5rem;
  cursor: pointer;
`;

export const NotifySuccess = ({ notify }) => (
    <NotifyHolder type='success'>
      <TextWrapper>
        {/* {withRetry && <RetryLink onClick={onClick}>Try again.</RetryLink>} */}
        <Text>{ notify && notify.text }</Text>
        <span style={{ fontSize: '1.5rem' }} role="img" aria-label="thumb_up">👍</span>
      </TextWrapper>
    </NotifyHolder>
);

export const NotifyError = ({ text }) => (
    <NotifyHolder type='error'>
      <TextWrapper>
        {/* {withRetry && <RetryLink onClick={onClick}>Try again.</RetryLink>} */}
        <Text>{ text }</Text>
        <span style={{ fontSize: '1.5rem' }} role="img" aria-label="sad_face">🙁</span>
      </TextWrapper>
    </NotifyHolder>
);

const Notify = () => {
    const { queue } = useSelector((state: RootState) => state.notify);
    const dispatch = useDispatch();

    return (
        <Fragment>
            {queue.map(notify => {
                return (
                    <Snackbar
                        key={v4()}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={notify && notify.open}
                        onExited={() => dispatch(resetState({}))}
                        autoHideDuration={notify && notify.timeout}
                        onClose={() => dispatch(hideNotify(notify))}
                        >
                            { notify && notify.type === 'error'
                                ? <NotifyError notify={notify} />
                                : <NotifySuccess notify={notify} /> }
                        </Snackbar>
                );
            })}
        </Fragment>
    );
};



// NotificationCommonSuccess.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default Notify;
