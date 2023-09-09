import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Permission, PermissionRequest, PermissionType } from '../models/index';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { PermissionService } from '../services/PermissionService';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #42a5f5',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const PermissionsList = () => {
    const [permission, setPermission] = useState<PermissionRequest>({} as PermissionRequest)
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [permissionTypes, setPermissionTypes] = useState<PermissionType[]>([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [title, setTitle] = useState('');
    const {getAllPermissions, getAllPermissionTypes, createPermission, updatePermission, deletePermission} = PermissionService();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'idPermissionType')
            setPermission({ ...permission, permissionType: value })
        else
            setPermission({ ...permission, [name]: value })
    }

    const handleModal = (id: number | null) => {
        if (id === null) {
            setTitle('Crear Permiso');
            setOpen(!open);
            setPermission({} as PermissionRequest);
        }
        else {
            setTitle('Modificar Permiso');
            setOpen(!open);
            let data: Permission = permissions.find(x => x.id === id)!;
            setPermission({ 
                id: data.id,
                employeeName: data.employeeName,
                employeeLastName: data.employeeLastName,
                permissionType: data.idPermissionType
            });
        }
    }

    const handleModalDelete = (id: number) => {
        setOpenDelete(!openDelete);
        let data: Permission = permissions.find(x => x.id === id)!;
        setPermission({ 
            id: data.id,
            employeeName: data.employeeName,
            employeeLastName: data.employeeLastName,
            permissionType: data.idPermissionType
        });
    }

    const executeAction = async () => {
        if (permission.id === undefined) {
            setPermissions([...permissions, await createPermission(permission)]);
        } else {
            setPermissions([...permissions, await updatePermission(permission)]);
        }
        setOpen(!open);
    }

    const confirmDelete = async (id: number) => {
        if (await deletePermission(id)) {
            setPermissions(permissions.filter(x => x.id !== id));
        }
        setOpenDelete(!openDelete);
    }

    useEffect(() => {
        const getDataPermissions = async () => {
            const data = await getAllPermissions();
            setPermissions(data);
        }
        const getDataPermissionTypes = async () => {
            const data = await getAllPermissionTypes();
            setPermissionTypes(data);
        }
        getDataPermissions();
        getDataPermissionTypes();
    }, []);

    return (
        <Container sx={{ marginTop: '2rem' }}>
            <Typography variant='h2'
                        color='primary'
                        align='center'>
                Lista de Permisos
            </Typography>
            <Button variant='contained'
                    sx={{ color: 'white', marginTop: '2rem' }}
                    onClick={ () => handleModal(null) }>
                Crear Permiso
            </Button>
            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                <Table sx={{ minWidth: 650 }} size='small'>
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell align='right'>Permission</TableCell>
                        <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map((row) => (
                            <TableRow key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th'
                                        scope='row'>
                                    {row.employeeName}
                                </TableCell>
                                <TableCell component='th'
                                        scope='row'>
                                    {row.employeeLastName}
                                </TableCell>
                                <TableCell align='right'>{row.permissionType}</TableCell>
                                <TableCell align='right'>
                                    <Button onClick={ () => handleModal(row.id) }>
                                        <ModeEditOutlineIcon color='primary' />
                                    </Button>
                                    <Button onClick={ () => handleModalDelete(row.id) }>
                                        <DeleteIcon color='error' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={ open }>
                <Box sx={{ ...style, width: '30%' }}>
                <Typography variant='h2'
                            color='secondary'
                            align='center'>
                    { title }
                </Typography>
                <Grid container sx={{ marginTop: '2rem' }}>
                    <Grid xs={12} sx={{ padding: '1rem' }}>
                        <TextField required
                                    label='Nombre'
                                    fullWidth
                                    name='employeeName'
                                    value={permission.employeeName}
                                    onChange={ handleChange }/>
                    </Grid>
                    <Grid xs={12} sx={{ padding: '1rem' }}>
                        <TextField required
                                    label='Apellido'
                                    fullWidth
                                    name='employeeLastName'
                                    value={permission.employeeLastName}
                                    onChange={ handleChange }/>
                    </Grid>
                    <Grid xs={12} sx={{ padding: '1rem' }}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Permiso</InputLabel>
                        <Select value={permission.permissionType}
                                label='Permiso'
                                onChange={ handleChange }
                                name='idPermissionType'>
                            {permissionTypes.map((type) => (
                                <MenuItem value={type.id}>{type.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container
                        sx={{ padding: '1rem' }}>
                    <Grid xs={6}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'>
                        <Button onClick={ executeAction } size='large'>Guardar</Button>
                    </Grid>
                    <Grid xs={6}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'>
                        <Button onClick={ () => setOpen(!open) } size='large'>Cancelar</Button>
                    </Grid>
                </Grid>
                </Box>
            </Modal>

            <Modal open={ openDelete }>
                <Box sx={{ ...style, width: '30%' }}>
                <Typography variant='h2'
                            color='secondary'
                            align='center'
                            sx={{ marginBottom: '2rem' }}>
                    Confirmación
                </Typography>
                <Typography variant='body1'
                            align='justify'>
                    ¿Estás seguro que deseas eliminar a <strong>{permission.employeeName} {permission.employeeLastName}</strong>?
                </Typography>
                <Grid container
                        sx={{ padding: '1rem' }}>
                    <Grid xs={6}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'>
                        <Button onClick={ () => confirmDelete(permission.id) } size='large'>Eliminar</Button>
                    </Grid>
                    <Grid xs={6}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'>
                        <Button onClick={ () => setOpenDelete(!openDelete) } size='large'>Cancelar</Button>
                    </Grid>
                </Grid>
                </Box>
            </Modal>
        </Container>
    )
}
