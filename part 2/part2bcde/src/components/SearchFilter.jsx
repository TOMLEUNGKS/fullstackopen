const SearchFilter = ({searchWord, handleSearch}) => {

    return (
        <div>
          filter shown with: <input value={searchWord} onChange={handleSearch}/>
      </div>
    )
}

export default SearchFilter