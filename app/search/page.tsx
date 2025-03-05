import SearchResults from "@/components/SearchResults"

export default function SearchPage({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <SearchResults searchParams={searchParams} />
    </div>
  )
}

