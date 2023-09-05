import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Permission } from '../models/Permission';
import api from '../services/ConfigService';

export const PermissionsList = () => {
    const [permissions, setPermissions] = useState<Permission[]>([])
    useEffect(() => {
        const getData = api.get('Permissions/GetPermissions')
        .then(response => {
            setPermissions(response.data);
        }).catch(error => {
            console.log(error.response);
        });
    }, [])
    return (
        <Container sx={{ marginTop: '2rem' }}>
            <Typography variant='h2' color='primary' align='center'>Lista de Permisos</Typography>
            <Button variant='contained'
                    sx={{ color: 'white', marginTop: '2rem' }}>
                Agregar Permiso
            </Button>
            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell align="right">Permission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map((row) => (
                            <TableRow key={row.Id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th"
                                        scope="row">
                                    {row.EmployeeName}
                                </TableCell>
                                <TableCell component="th"
                                        scope="row">
                                    {row.EmployeeLastName}
                                </TableCell>
                                <TableCell align="right">{row.PermissionType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
