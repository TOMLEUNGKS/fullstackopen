const SearchFilter = ({searchWord, handleSearch}) => {

    // const [searchWord, setSearchWord] = useState('')
    // const handleSearch = (event) => {
    //     setSearchWord(event.target.value)
    //     showSearchIsTrue()
    //   }

    return (
        <div>
          filter shown with: <input value={searchWord} onChange={handleSearch}/>
      </div>
    )
}

export default SearchFilter