import PropTypes from 'prop-types';

const CategoryForm = ({ value, setValue, handleSubmit, handleDelete }) => {
  return (
    <div className="p-4 rounded-sm space-y-3 mt-1 mb-12">
      <form onSubmit={handleSubmit} className="bg-transparent space-y-4 mt-0">
        <input
          type="text"
          className="py-4 px-4 border bg-gray-900 text-gray-100 rounded-sm w-full focus:outline-none"
          placeholder="Enter category name.."
          value={value}
          onChange={(e) => setValue(e.target.value)} />

        <div className="flex p-2 justify-between">
          <button
            onClick={handleSubmit}
            className="bg-black border shadow-sm text-white font-bold py-2 px-4 rounded-md hover:bg-[#7231ff] hover:text-white">
            Submit
          </button>

          <button
            onClick={handleDelete}
            className="bg-[#d21404] border shadow-sm text-white font-bold py-2 px-4 rounded-md hover:bg-[#7231ff] hover:text-white">
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

export default CategoryForm