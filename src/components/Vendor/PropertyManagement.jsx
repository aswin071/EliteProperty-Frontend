import React, { useState } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PropertyManagement() {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.accessToken);

  // Define state to store form data
  const [formData, setFormData] = useState({
          title:'',
          description: '',
          address:'',
          price: '',
          property_type: '',  
          location: '',
          num_bedrooms: '',
          num_bathrooms: '',
          property_size: '',
          image1: null,
          image2: null,
          image3: null,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if the input is a file input
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Store the file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const route = '/property/add-property/';

    // Create a FormData object to send form data with file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await api.post(route, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
          // Add any necessary headers, like authentication
        },
      });

      if (response.status === 201) {
        // Handle success (property created successfully)
        toast.success('Property added successfully');
        setFormData({
          title: '',
          description: '',
          address:'',
          price: '',
          property_type: '',  
          location: '',
          num_bedrooms: '',
          num_bathrooms: '',
          property_size: '',
          image1: null,
          image2: null,
          image3: null,
        });
        // Optionally, you can navigate to a different page here
      } else {
        // Handle errors (property creation failed)
        toast.error('Property upload failed. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Property upload error:', error);
      toast.error('Property upload failed due to a network error.');
    }
   
  };


  return (
    <div className="flex">
    <div className="w-1/4">
      <VendorSidebar />
    </div>
    <div className="w-3/4 p-4">
      <h1 className="text-2xl font-semibold mb-4">Property Management</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property Title"
          />
        </div>
        <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Description:
                    </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Property Description"
                    rows="4" // You can adjust the number of rows
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                     Address:
                    </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Property Address"
                    rows="4" // You can adjust the number of rows
                    />
                  </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Property Price"
                      />
                    </div>

                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_type">
                      Property Type:
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="property_type"
                      id="property_type"
                      value={formData.property_type}
                      onChange={handleChange}
                    >
                  <option value="">Select</option> {/* Updated value to an empty string */}
                  <option value="Rent">For Rent</option>
                  <option value="Sale">For Sale</option>
                </select>
              </div>

                 

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                      Location:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Property Location"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="num_bedrooms">
                      Number of Bedrooms:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="num_bedrooms"
                      id="num_bedrooms"
                      value={formData.num_bedrooms}
                      onChange={handleChange}
                      placeholder="Number of Bedrooms"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="num_bathrooms">
                      Number of Bathrooms:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="num_bathrooms"
                      id="num_bathrooms"
                      value={formData.num_bathrooms}
                      onChange={handleChange}
                      placeholder="Number of Bathrooms"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_size">
                      Property Size:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="property_size"
                      id="property_size"
                      value={formData.property_size}
                      onChange={handleChange}
                      placeholder="Property Size (in square feet)"
                    />
                  </div>
                  <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image1">
                Image 1:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="image1"
                id="image1"
                accept="image/*" // Allow only image files
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image2">
                Image 2:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="image2"
                id="image2"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image3">
                Image 3:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="image3"
                id="image3"
                accept="image/*"
                onChange={handleChange}
              />
             
            </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   
                  >
                    Upload Property
                    
                  </button>

                        </form>
                      </div>
                
                    </div>
  );
}

export default PropertyManagement;
