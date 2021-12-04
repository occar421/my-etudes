function App() {
  const { props } = useAutocomplete();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-96 w-96 bg-white flex justify-center items-center drop-shadow">
        <form
          className="border border-black"
          onSubmit={(e) => {
            console.info(e);
            e.preventDefault();
          }}
        >
          <input type="text" className="w-60 p-1" />
          <button type="submit" className="bg-blue-500 text-white px-2 py-1">
            Search
          </button>
        </form>
        <Autocomplete {...props} />
      </div>
    </div>
  );
}

export default App;

const useAutocomplete = () => ({ props: {} });

const Autocomplete = ({}: {}) => (
  <ul>
    <li>a</li>
  </ul>
);
