const Pagination = ({currentPage, totalPages, totalRecords }) =>{
    return(
        <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Exibindo <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> de <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span> paginas, totalizando <span className="font-semibold text-gray-900 dark:text-white">{totalRecords}</span> registros
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Anterior
            </button>
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Proximo
            </button>
        </div>
        </div>


    )
}

export default Pagination