import React from 'react';
import Table from 'react-bootstrap/Table';
import s from './TableBox.module.scss';

const TableBox = ({title, body, id}) => {
    return (
        <>

            <Table striped bordered hover>

            <tbody>
            <tr>
                <td className={s.tdId}>{id}</td>
                <td className={s.tdTitle}>{title}</td>
                <td>{body}</td>
            </tr>
            </tbody>
            </Table>
        </>
    );
};

export default TableBox;