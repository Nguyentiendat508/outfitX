import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';

function PaginationTable({ data, rowsPerPage, handleChange, page }) {
    return (
        <div className='mt-2 flex justify-end'>
            <Stack spacing={2}>
                <Pagination
                    color="primary"
                    count={Math.ceil(data.length / rowsPerPage)}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: () => <IoMdArrowDropleftCircle size={24} />,
                                next: () => <IoMdArrowDroprightCircle size={24} />
                            }}
                            sx={{
                                color: "white", // màu số & icon mặc định
                                "&.Mui-selected": {
                                    backgroundColor: "red", // nền khi chọn
                                    color: "white", // màu chữ khi chọn
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white", // màu icon mũi tên
                                }
                            }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </div>
    );
}

export default PaginationTable;
