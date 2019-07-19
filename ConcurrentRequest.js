/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
export function ConcurrentRequest(dispatch, requests, priCallback, that) {
  const responses = [];
  for (let i = 0; i < requests.length; i++) {
    responses.push({});
  }
  let successRequestCount = 0;
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].type && requests[i].payload) {
      const data = requests[i];
      setTimeout(function (data) {
        dispatch({
          type: data.type,
          payload: data.payload,
        }).then(response => {
          responses[i]=response.data;
          successRequestCount++;
          if (requests.length == successRequestCount) {
             priCallback(responses, that);
          }
        })
      }(data),1)
    }
  }
}
