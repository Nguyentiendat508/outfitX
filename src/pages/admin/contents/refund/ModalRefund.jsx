import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import { ProductsContext } from "../../../../contexts/ProductProvider";
import { getOjectById } from "../../../../services/reponsive";
import { useContext } from "react";
import { updateDocument } from "../../../../services/firebaseService";

function ModalRefund({ status, setStatus, open, data, onClose }) {
  const products = useContext(ProductsContext);

  const updateStatus = async () => {
      await updateDocument("refund", {...data, status : status});
      onClose();
  }
  if (!data) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Chi tiết hoàn tiền</DialogTitle>

      <DialogContent>
        <div spacing={2}>
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" color="text.secondary">
                Mã Đơn
              </Typography>
              <Typography fontWeight={500}>{data.order_id}</Typography>
            </div>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Số tiền hoàn
              </Typography>
              <Typography fontWeight={600}>
                {data.newDate?.toDate().toLocaleString()}
              </Typography>
            </Grid>
          </div>

          <Divider />
          <div className="flex mt-3 items-center justify-between">
            <div>
              <Typography variant="caption" color="text.secondary">
                Sản phẩm
              </Typography>
              <Typography fontWeight={500}>
                {getOjectById(products, data.product_id).name};
              </Typography>
            </div>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Số tiền hoàn
              </Typography>
              <Typography fontWeight={600} color="error">
                {Number(data.price).toLocaleString("vi-VN")}₫
              </Typography>
            </Grid>
          </div>
          <Divider />
          <div className="mt-3">
            <Typography variant="caption" color="text.secondary">
              Lý Do
            </Typography>
            <Typography>{data.description}</Typography>
          </div>
          <Divider />
          <div className="mt-5">
            {data.imgUrls?.length > 0 && (
              <>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mb={1}
                    display="block"
                  >
                    Hình ảnh
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {data.imgUrls.map((url, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={url}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid #eee",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </div>

          <div className="w-64 mt-5">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Trạng thái
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm
               focus:border-blue-500 focus:ring-2 focus:ring-blue-100
               transition cursor-pointer"
            >
              <option value="">Select chooses status</option>
              <option value="Waiting">Waiting</option>
              <option value="Approved">Approved</option>
              <option value="Refuse">Refuse</option>
            </select>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={updateStatus} variant="contained" color="warning" disabled={data.status == status} >
          Update
        </Button>
        <Button onClick={onClose} variant="outlined">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalRefund;
