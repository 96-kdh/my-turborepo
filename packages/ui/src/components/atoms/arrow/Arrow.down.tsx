import React from 'react';
import { styled } from 'styled-components';

interface ContainerProps {
  width: string;
  height: string;
  color: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.color};
    mask-repeat: no-repeat;
    mask-position: center;
    mask-image: url('/icons/arrowDown.svg');
  }
`;

const ArrowDown = ({ width, height, color }: ContainerProps) => {
  return <Container width={width} height={height} color={color} />;
};

export default ArrowDown;
