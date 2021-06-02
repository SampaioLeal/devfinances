import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";

interface Props {
  open: boolean;
  handleClose(): void;
}

function AddTransaction({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const initialValues = {
    description: "",
    type: "",
    amount: "",
  };

  function handleValidate(values: any) {}

  function handleSubmit(values: any) {}

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Adicionar transação
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <TextField
                fullWidth
                name="description"
                label="Descrição"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTransaction;
