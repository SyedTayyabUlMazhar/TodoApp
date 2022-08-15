import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Loader } from '..';

export type Props = {
  type: string,
  [key: string]: any,
};

const ActionLoader: React.FC<Props> = (props: Props) =>
{
  const { type, ...loaderProps } = props;

  const isLoading = useSelector((state: any) => state?.StatusFlagsReducer?.[type]?.loading);

  return isLoading ? <Loader {...loaderProps}/> : null;
};

export default ActionLoader;
