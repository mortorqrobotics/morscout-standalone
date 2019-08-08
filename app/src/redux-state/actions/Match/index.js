import { loadMatch } from "Shared/types/Match";

export default id => ({
  type: loadMatch,
  data: {
    id
  }
});
