import PropTypes from 'prop-types';

export const CategoryForm = ({ value, setValue, handleSubmit, handleDelete }) => {
  return (
    <div className="p-4 rounded-sm space-y-3 mt-1 mb-12">
      <form onSubmit={handleSubmit} className="bg-transparent space-y-4 mt-0">
        <input
          type="text"
          className="py-4 px-4 border bg-[#101011] border-gray-900 text-gray-100 rounded-sm w-full focus:outline-none"
          placeholder="Enter category name.."
          value={value}
          onChange={(e) => setValue(e.target.value)} />

        <div className="flex p-2 justify-between mx-20">
          <button
            onClick={handleSubmit}
            className="bg-gray-900 border-b border-[#080] text-gray-100 font-semi-bold text-xl py-2 px-4 rounded-sm m-3 sm:truncate  hover:bg-[#060] hover:border-gray-100 focus:outline-none">
            Submit
          </button>

          <button
            onClick={handleDelete}
            className="bg-gray-900 border-b border-[#080] text-gray-100 font-semi-bold text-xl py-2 px-5 rounded-sm m-3 sm:truncate  hover:bg-[#800] hover:border-gray-100 focus:outline-none">
            Delete
          </button>
        </div>
      </form>
    </div>
  )
};

CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
};

CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
};