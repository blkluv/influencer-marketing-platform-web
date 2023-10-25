import { motion } from "framer-motion";
import { availableCategories } from "~/routes/add-categories";
import type { DbInfluencer } from "~/types/ApiOps";

export function ProfileForm({
  handleSubmit,
  formData,
  handleInputChange,
  handleCategoryChange,
  token,
}: /* Include other necessary props */
{
  handleSubmit: any;
  formData: DbInfluencer;
  handleInputChange: any;
  handleCategoryChange: any;
  token: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl w-full p-4 bg-white shadow-md rounded-md mt-10">
        <form onSubmit={handleSubmit}>
          {/* hidden label for token */}
          <input
            type="hidden"
            name="token"
            value={token}
            readOnly
            className="hidden"
          />
          {/* <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              accept="image/*"
            />
          </motion.div> */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="fname"
              id="firstName"
              value={formData.fname}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              id="lastName"
              value={formData.lname}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          {/* <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div> */}
          {/* <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div> */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700"
            >
              Categories
            </label>
            {/* Implement your category selection component here */}
          </motion.div>

          <div className="flex flex-wrap justify-center">
            {Object.entries(availableCategories).map((category) => (
              <div
                key={category[0]}
                className={`p-3 m-2 rounded-full cursor-pointer transform hover:scale-105 transition duration-300 ${
                  formData.influencerProfile.categories.includes(
                    category[0].toUpperCase()
                  )
                    ? " bg-secondary text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  formData.influencerProfile.categories.includes(
                    category[0].toUpperCase()
                  )
                    ? handleCategoryChange(
                        formData.influencerProfile.categories.filter(
                          (selectedCategory: string) =>
                            selectedCategory !== category[0].toUpperCase()
                        )
                      )
                    : formData.influencerProfile.categories.length < 3 &&
                      handleCategoryChange([
                        ...formData.influencerProfile.categories,
                        category[0].toUpperCase(),
                      ]);
                }}
              >
                {category[1]}
              </div>
            ))}
          </div>
          <motion.div className="flex justify-end" variants={itemVariants}>
            <button
              type="submit"
              className="btn btn-primary mt-2 w-full"
              disabled={
                formData.fname === "" ||
                formData.lname === "" ||
                formData.email === "" ||
                formData.influencerProfile.categories.length === 0
              }
            >
              Save
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
