import <%= name %>Types from "<%= actionTypesPath %>";
import { IReduxAction } from "<%= storeTypesPath %>";

<% types.map((type, i) => { %>
export function <%= type.split("_").map((e, i) => i === 0 ? e.toLowerCase() : `${e.charAt(0).toUpperCase()}${e.substr(1, e.length).toLowerCase()}`).join("") %>Action(): (dispatch: (x: IReduxAction) => void) => void {
  return async (dispatch: (x: IReduxAction) => void): Promise<void> => {
      return dispatch({
          type: <%= name %>Types.<%= type %>,
          payload: <%= Object.values(state)[i] %>
      });
  };
}
<% }) %>
