import { loadMatch } from "shared/types/Match";

export default id => ({
  type: loadMatch,
  data: {
    id
  }
});
