import { useState } from "react"

const useForm = (initialize) => {
    const [form, setForm] = useState(initialize);
    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    const resetForm = () => setForm(initialize)

    return {
        form, setForm,
        handleChange, resetForm
    }

}
export default useForm;
