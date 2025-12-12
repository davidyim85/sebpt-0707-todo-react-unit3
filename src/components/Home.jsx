import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASEURL } from "../contants";

const Home = (props) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${BASEURL}/todos/`, {
                headers: {
                    Authorization: `Bearer ${props.user}`
                }
            });
            setTodos(res.data);
        } catch (error) {
            console.error(error);
        }
    }



    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); //put all the form data in the variable called 'formData'
        const data = {
            description: formData.get('description'),
            duration: Number(formData.get('duration')),
            isComplete: formData.get('isComplete') === 'on',
        }
        try {
            await axios.post(
                `${BASEURL}/todos/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${props.user}`
                    }
                }
            );
            fetchTodos();
            e.target.reset(); //clear all fields
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target); //put all the form data in the variable called 'formData'
        const data = {
            description: formData.get('description'),
            duration: Number(formData.get('duration')),
            isComplete: formData.get('isComplete') === 'on',
        }
        try {
            await axios.put(
                `${BASEURL}/todos/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${props.user}`
                    }
                }
            );
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${BASEURL}/todos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${props.user}`
                    }
                }
            );
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    }
    console.log(todos)

    return (<main>
        <section>
            <h2>Add New Todo</h2>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="description">Todo: </label>
                <input
                    type="text"
                    name="description"
                    defaultValue={''}
                />
                <label htmlFor="duration">Duration: </label>
                <input
                    type="number"
                    name="duration"
                    defaultValue={0}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        style={{ margin: 0 }}
                        type="checkbox"
                        name="isComplete"
                        id="isComplete"
                        defaultChecked={false}
                    />
                    <label htmlFor="isComplete">Is Complete</label>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
        <h2>List of Todos</h2>
        <section>
            {todos.map((todo) => {
                return (
                    <form key={todo._id} onSubmit={(e) => handleEdit(e, todo._id)} style={{ display: "flex", gap: '5px' }}>
                        <label htmlFor="description">Todo: </label>
                        <input
                            type="text"
                            name="description"
                            defaultValue={todo.description}
                        />

                        <label htmlFor="duration">Duration: </label>
                        <input
                            type="number"
                            name="duration"
                            defaultValue={todo.duration}
                        />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                style={{ margin: 0 }}
                                type="checkbox"
                                name="isComplete"
                                id="isComplete"
                                defaultValue={todo.isComplete}
                            />
                            <label htmlFor="isComplete">Is Complete</label>
                        </div>
                        <div>
                            <button type="submit">Edit</button>
                            <button type="button" onClick={() => handleDelete(todo._id)} >
                                Delete
                            </button>
                        </div>
                    </form>
                )
            })}
        </section>
    </main>)

}
export default Home;