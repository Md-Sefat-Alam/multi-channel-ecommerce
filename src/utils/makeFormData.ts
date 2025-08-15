/**
 * Function to create a FormData object from an object with key-value pairs,
 * including handling file objects from Ant Design's Upload component.
 * @param data - The object containing key-value pairs (including file objects).
 * @returns FormData instance with appended key-value pairs.
 */
const makeFormData = (data: { [key: string]: any }): FormData => {
    const formData = new FormData();

    // Loop through the object keys and append each key-value pair to the FormData
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];

            // Skip appending if the value is undefined
            if (value === undefined) continue;

            // Check if the value is an array (potentially for file uploads)
            if (Array.isArray(value)) {
                value.forEach((fileItem) => {
                    // Ant Design's Upload component has `originFileObj` for actual file uploads
                    if (fileItem?.originFileObj) {
                        formData.append(key, fileItem.originFileObj);
                    }
                });
            } else {
                // Append other non-file fields to FormData
                formData.append(key, value);
            }
        }
    }

    return formData;
};

export default makeFormData;
