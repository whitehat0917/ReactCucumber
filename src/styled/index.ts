import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TTheme } from 'theme';
import { v4 } from 'uuid';

// export const SSkeletonLine = styled(SSkeletonPulse)`
//   width: 5.5em;
//   border-radius: 5px;

//   &::before {
//     content: "\00a0";
//   }
// `;

export const MContentHolder = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto 118px;
  padding: 60px 0 0;

  @media screen and (min-width: 1240px) {
    padding: 60px 0 0;
  }
`;

type MTitleProps = {
  theme: TTheme;
  fontSize?: string;
  lineHeight?: string;
};

export const MTitle = styled.h1<MTitleProps>`
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: ${({ fontSize }) => `${fontSize}px` || '64px'};
  color: ${({ theme }) => theme.palette.gray['100']};
  line-height: ${({ lineHeight }) => `${lineHeight}px` || '60px'};
`;

type MLinkProps = {
  theme: TTheme;
  fontSize?: string;
  lineHeight?: string;
};

export const MLink = styled(Link)<MLinkProps>`
  color: ${({ theme }) => theme.palette.primary['30']};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ fontSize }) => `${fontSize}px` || '24px'};
  line-height: ${({ lineHeight }) => `${lineHeight}px` || '28px'};
  text-decoration: none;
  cursor: pointer;
`;

export const MPseudoLink = styled.span<MLinkProps>`
  color: ${({ theme }) => theme.palette.primary['30']};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ fontSize }) => `${fontSize}px` || '24px'};
  line-height: ${({ lineHeight }) => `${lineHeight}px` || '28px'};
  cursor: pointer;
`;

type MTextProps = {
  theme: TTheme;
  fontSize?: string;
  lineHeight?: string;
};

export const MText = styled.p<MTextProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${({ fontSize }) => `${fontSize}px` || '24px'};
  color: ${({ theme }) => theme.palette.gray['100']};
  line-height: ${({ lineHeight }) => `${lineHeight}px` || '36px'};
`;

type DescriptionProps = {
  theme: TTheme;
  fontSize?: string;
};

export const Description = styled.p<DescriptionProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${({ fontSize }) => `${fontSize}px` || '18px'};
  color: ${({ theme }) => theme.palette.gray['60']};
`;

export const ContentHolder = styled.div`
  padding: 0 20px;
  width: 100%;
`;

type TitleHolderProps = {
  theme: TTheme;
  margin?: string;
};

export const TitleHolder = styled.div<TitleHolderProps>`
  margin: ${({ margin }) => `${margin}px` || '34px'};
`;

export const SSkeletonPulse = styled.div`
  display: inline-block;
  min-height: 12px;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

type TSkeleton = {
  theme: TTheme;
  height?: string;
  width?: string;
  margin?: string;
};

export const Skeleton = styled(SSkeletonPulse)<TSkeleton>`
  margin: ${({ margin }) => margin};
  min-height: 28px;
  /* max-height: 224px; */
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  border-radius: 5px;

  &::before {
    content: '';
  }
`;

export const skeletonList = [
  {
    id: v4(),
  },
  {
    id: v4(),
  },
  {
    id: v4(),
  },
  {
    id: v4(),
  },
];

export const Flex1 = styled.div`
  flex: 1;
`;
export const FlexCenteredWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
