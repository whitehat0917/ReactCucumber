const updateContactData = (state, { payload }) => ({
    ...state,
    contactData: payload
});

const submitContactData = (state, action) => state;

export default {
    updateContactData,
    submitContactData
};
