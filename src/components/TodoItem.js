import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getClasses } from "../utils/getClasses";
import styles from '../styles/modules/todoItem.module.scss'
import { format } from "date-fns/esm";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";

const child = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1
    }
}

const TodoItem = ({todo}) => {
    const dispatch = useDispatch()
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(todo.status === 'complete') {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [todo.status])

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success('Todo is deleted')
    }
    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }

    const handleCheck = () => {
        setChecked(!checked)
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }))
    }

    return (
        <>
            <motion.div className={styles.item} variants={child}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck}/>
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, todo.status === 'complete'
                                                && styles['todoText--completed']])}>
                            {todo.title}
                        </p>
                        <p className={styles.item}>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                        onClick={handleDelete} onKeyDown={handleDelete}
                        role='button' tabIndex={0}>
                        <MdDelete />
                    </div>
                    <div className={styles.icon}
                        onClick={handleUpdate} onKeyDown={handleUpdate}
                        role='button' tabIndex={1}>
                        <MdEdit />
                    </div>
                </div>
            </motion.div>
            <TodoModal 
                type='update' 
                todo={todo}
                modalOpen={updateModalOpen} 
                setModalOpen={setUpdateModalOpen}/>
        </>   
    )
}

export default TodoItem

