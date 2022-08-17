import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Loader } from '..';
import StatusFlagSelectors from '../../store/selectors/StatusFlagSelectors';

export type Props = {
  type: string,
  [key: string]: any,
};

const ActionLoader: React.FC<Props> = (props: Props) =>
{
  const { type, ...loaderProps } = props;

  const isLoading = useSelector(StatusFlagSelectors.isRequestLoading(type));

  return isLoading ? <Loader {...loaderProps}/> : null;
};

export default ActionLoader;
