import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import NumericInput from "material-ui-numeric-input";
import authStore from "../../stores/auth";
import transactionsStore from "../../stores/transactions";

interface Props {
  open: boolean;
  handleClose(): void;
}

function AddTransaction({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const formik = useFormik({
    initialValues: {
      description: "",
      type: "",
      date: new Date(),
      amount: 0,
    },
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  function handleValidate(values: any) {
    const errors: { [key: string]: string } = {};

    if (!values.description) {
      errors.description = "Campo obrigatório";
    } else if (!values.type) {
      errors.type = "Campo obrigatório";
    } else if (!values.date) {
      errors.date = "Campo obrigatório";
    } else if (!values.amount) {
      errors.amount = "Campo obrigatório";
    }

    return errors;
  }

  function handleSubmit(values: any) {
    try {
      const transaction = { ...values };

      if (transaction.type === "output") {
        transaction.amount *= -1;
      }

      delete transaction.type;

      transactionsStore.create(authStore.user!.uid!, transaction);
      handleClose();
    } catch (err) {}
  }

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
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Descrição"
                variant="outlined"
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
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="select-label">Tipo</InputLabel>
                <Select
                  labelId="select-label"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  label="Tipo"
                  name="type"
                >
                  <MenuItem value="">
                    <em>Nenhuma</em>
                  </MenuItem>
                  <MenuItem value="input">Entrada</MenuItem>
                  <MenuItem value="output">Saída</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <KeyboardDatePicker
                fullWidth
                inputVariant="outlined"
                variant="dialog"
                margin="normal"
                name="date"
                label="Data"
                format="dd/MM/yyyy"
                value={formik.values.date}
                onChange={(value) => formik.setFieldValue("date", value)}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>

            <Grid item xs={12}>
              <NumericInput
                value={formik.values.amount}
                name="amount"
                precision="2"
                decimalSeparator=","
                thousandSeparator="."
                label="Valor (R$)"
                onChange={(value) => formik.setFieldValue("amount", value)}
                variant="outlined"
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={
                  formik.touched.amount ? formik.errors.amount : undefined
                }
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Voltar
        </Button>
        <Button onClick={formik.submitForm} color="primary" autoFocus>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTransaction;
