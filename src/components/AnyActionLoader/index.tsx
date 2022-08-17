import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '..';
import StatusFlagSelectors from '../../store/selectors/StatusFlagSelectors';

export type Props = {
  [key: string]: any,
};

const AnyActionLoader: React.FC<Props> = (props: Props) =>
{
  const isLoading = useSelector(StatusFlagSelectors.isAnyRequestLoading);

  return isLoading ? <Loader {...props} isModalLoader={true}/> : null;
};

export default AnyActionLoader;
