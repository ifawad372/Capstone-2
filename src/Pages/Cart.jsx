import { useDispatch, useSelector } from "react-redux";
import {
    addItem,
    decreaseQuantity,
    removeItem,
    clearCart,
} from "../store/slices/cartList";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
    const dispatch = useDispatch();
    const { items, totalAmount } = useSelector((state) => state.cart);

    const handleAdd = (id, name, price, weight, image) =>
        dispatch(addItem({ id, name, price, weight, image }));

    const handleDecrease = (id) => dispatch(decreaseQuantity(id));
    const handleRemove = (id) => dispatch(removeItem(id));
    const handleClear = () => dispatch(clearCart());

    if (items.length === 0) {
        return (
            <Box className="flex flex-col items-center justify-center h-[70vh] text-center">
                <Typography variant="h5" sx={{ color: "#019376", fontWeight: "bold" }}>
                    Your Cart is Empty 🛒
                </Typography>
                <Typography sx={{ mt: 1, color: "#777" }}>
                    Add some fresh items to get started!
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="container mx-auto px-6 py-12">
            <Typography
                variant="h4"
                sx={{
                    color: "#019376",
                    fontWeight: "bold",
                    mb: 4,
                    textAlign: "center",
                }}
            >
                Shopping Cart
            </Typography>

            {/* Cart Items */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mb: 6,
                }}
            >
                {items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderRadius: 3,
                            boxShadow: 3,
                            "&:hover": { boxShadow: 6 },
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                }}
                            />
                            <CardContent sx={{ p: 0 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {item.name}
                                </Typography>
                                <Typography sx={{ color: "#777" }}>{item.weight}</Typography>
                                <Typography sx={{ color: "#019376", fontWeight: "bold" }}>
                                    ${item.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Box>

                        {/* Quantity Controls */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <IconButton
                                onClick={() => handleDecrease(item.id)}
                                sx={{
                                    backgroundColor: "#019376",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#017a63" },
                                    width: 32,
                                    height: 32,
                                }}
                            >
                                <RemoveIcon />
                            </IconButton>

                            <Typography
                                sx={{
                                    minWidth: 40,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                {item.quantity}
                            </Typography>

                            <IconButton
                                onClick={() =>
                                    handleAdd(
                                        item.id,
                                        item.name,
                                        item.price,
                                        item.weight,
                                        item.image
                                    )
                                }
                                sx={{
                                    backgroundColor: "#019376",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#017a63" },
                                    width: 32,
                                    height: 32,
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        {/* Total & Remove */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                minWidth: 160,
                                justifyContent: "flex-end",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#000",
                                }}
                            >
                                ${(item.totalPrice || 0).toFixed(2)}
                            </Typography>
                            <IconButton
                                onClick={() => handleRemove(item.id)}
                                sx={{
                                    color: "#d32f2f",
                                    "&:hover": { backgroundColor: "#fbeaea" },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Card>
                ))}
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Summary Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: "#019376", fontWeight: "bold" }}
                    >
                        Subtotal:
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#000",
                        }}
                    >
                        ${totalAmount.toFixed(2)}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleClear}
                        sx={{
                            borderColor: "#d32f2f",
                            color: "#d32f2f",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#d32f2f",
                                color: "white",
                                borderColor: "#d32f2f",
                            },
                        }}
                    >
                        Clear Cart
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#019376",
                            color: "white",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#017a63" },
                        }}
                    >
                        Checkout
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
