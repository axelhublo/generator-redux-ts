import { IReduxAction } from "<%= storeTypesPath %>";
import <%= name %>Types from "../types/<%= fileName %>.types";

const initialState: any = <%- JSON.stringify(state, null, 4) %>

export default function <%= fileName %>Reducer(
  state: any = initialState,
  action: IReduxAction
): void {
  switch (action.type) {
    <% types.map((type, i) => { %>
      case <%= name %>Types.<%= type %>:
        return {
          ...state,
          <%= Object.keys(state)[i] %>: action.payload
        };
    <% }) %>
    default:
      return state;
  }
}
