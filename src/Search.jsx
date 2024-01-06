import { Input } from "../components/ui/input";

function Search({ search, dispatch }) {
  function formSubmit(e) {
    e.preventDefault();
    dispatch({ type: "search", payload: e.target.value });
  }
  return (
    <form onSubmit={formSubmit} className="mb-4">
      <Input
        className="w-72"
        placeholder="Search"
        value={search}
        onChange={(e) => dispatch({ type: "search", payload: e.target.value })}
      />
    </form>
  );
}

export default Search;
