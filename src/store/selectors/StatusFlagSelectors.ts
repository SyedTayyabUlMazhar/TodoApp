function isRequestLoading(baseType: string):(state:any)=>boolean
{
  return (state:any) => state.StatusFlagsReducer?.[baseType]?.loading;
}

function isAnyRequestLoading(state:any):boolean
{
  let isAnyLoading:boolean = false;

  const StatusFlagsReducer = state.StatusFlagsReducer
  
  for(const actionType in StatusFlagsReducer)
  {
    isAnyLoading = StatusFlagsReducer?.[actionType]?.loading;
    if(isAnyLoading) break;
  }
  return isAnyLoading;
}

export default {
  isRequestLoading,
  isAnyRequestLoading,
}