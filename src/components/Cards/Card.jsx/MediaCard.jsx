import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, decreaseQuantity } from '../../../store/slices/cartList';
import {
    Card, CardActions, CardContent, CardMedia,
    Button, Typography, Modal, Box, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

export default function MediaCard({ productName, price, weight, imageURL }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const productId = `${productName.trim().toLowerCase().replace(/\s+/g, '-')}-${price}`;
    const cartItem = useSelector((state) =>
        state.cart.items.find((item) => item.id === productId)
    );
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addItem({
            id: productId,
            name: productName,
            price: Number(price),
            weight,
            image: imageURL,
        }));
    };

    const handleDecreaseQuantity = (e) => {
        e.stopPropagation();
        dispatch(decreaseQuantity(productId));
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        dispatch(removeItem(productId));
    };

    return (
        <>
            {/* Product Card */}
            <Card
                sx={{
                    maxWidth: 240,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    },
                    m: '0 auto',
                }}
                onClick={handleOpen}
            >
                <CardMedia
                    component="img"
                    height="160"
                    image={imageURL}
                    alt={productName}
                    sx={{
                        objectFit: 'contain',
                        p: 1.5,
                        backgroundColor: '#f8f9fa',
                    }}
                />
                <CardContent sx={{ px: { xs: 1, sm: 2 }, py: 6 }}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: 16, sm: 18, md: 20 },
                        }}
                    >
                        {productName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', fontSize: { xs: 13, sm: 14 } }}
                    >
                        {weight}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: { xs: 1, sm: 2 },
                        pb: 2,
                        pt: 0,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: '#019376', fontSize: { xs: 16, sm: 18 } }}
                    >
                        ${price}
                    </Typography>

                    {quantityInCart === 0 ? (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleAddToCart}
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#019376',
                                color: 'white',
                                borderRadius: 2,
                                px: 2,
                                py: 0.8,
                                fontSize: { xs: 13, sm: 14 },
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#017a63',
                                    boxShadow: '0 2px 8px rgba(1, 147, 118, 0.3)',
                                },
                                '& .MuiButton-startIcon': {
                                    marginRight: 0.5,
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                size="small"
                                onClick={handleDecreaseQuantity}
                                sx={{
                                    backgroundColor: '#019376',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#017a63' },
                                    width: 28,
                                    height: 28,
                                }}
                            >
                                <RemoveIcon sx={{ fontSize: 16 }} />
                            </IconButton>

                            <Typography
                                sx={{
                                    minWidth: 30,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                            >
                                {quantityInCart}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={handleAddToCart}
                                sx={{
                                    backgroundColor: '#019376',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#017a63' },
                                    width: 28,
                                    height: 28,
                                }}
                            >
                                <AddIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>
                    )}
                </CardActions>
            </Card>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 2,
                        width: { xs: '95vw', sm: '85vw', md: '70vw', lg: '55vw' },
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 4 },
                        overflowY: 'auto',
                        positionRelative: 'true',
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#666',
                            '&:hover': { color: '#000' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Product Image */}
                    <Box
                        sx={{
                            flex: '1 1 0%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={imageURL}
                            alt={productName}
                            sx={{
                                width: { xs: '100%', sm: 320, md: 360, lg: 400 },
                                height: { xs: 200, sm: 260, md: 350, lg: 420 },
                                objectFit: 'cover',
                                borderRadius: 2,
                            }}
                        />
                    </Box>

                    {/* Product Info */}
                    <Box
                        sx={{
                            flex: '1 1 0%',
                            maxWidth: { xs: '100%', md: 400 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: { xs: 1, sm: 2 },
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: '#000',
                                fontSize: { xs: 20, sm: 26, md: 32 },
                            }}
                        >
                            {productName}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: '#019376',
                                fontSize: { xs: 16, sm: 20, md: 26 },
                            }}
                        >
                            {price ? `$${price}` : ''}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: '#696868ff',
                                fontSize: { xs: 13, sm: 16, md: 20 },
                            }}
                        >
                            {weight ? `${weight}` : ''}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#696868ff',
                                lineHeight: 1.6,
                                fontSize: { xs: 12, sm: 14, md: 16 },
                                mb: 3,
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                            veritatis eum, ipsa error adipisci rem ex quod quam iusto omnis
                            sapiente sit sed, unde necessitatibus laborum quisquam eaque
                            earum totam!
                        </Typography>

                        {/* Add to Cart Section in Modal */}
                        <Box sx={{ mt: 3 }}>
                            {quantityInCart === 0 ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleAddToCart}
                                    sx={{
                                        backgroundColor: '#019376',
                                        color: 'white',
                                        py: 1.5,
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#017a63',
                                        },
                                    }}
                                >
                                    Add to Cart - ${price}
                                </Button>
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    <IconButton
                                        onClick={handleDecreaseQuantity}
                                        sx={{
                                            backgroundColor: '#019376',
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#017a63' },
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>

                                    <Typography
                                        sx={{
                                            minWidth: 60,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            border: '1px solid #019376',
                                            py: 1,
                                            borderRadius: 1,
                                        }}
                                    >
                                        {quantityInCart}
                                    </Typography>

                                    <IconButton
                                        onClick={handleAddToCart}
                                        sx={{
                                            backgroundColor: '#019376',
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#017a63' },
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            )}

                            {quantityInCart > 0 && (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleRemoveFromCart}
                                    sx={{
                                        mt: 2,
                                        color: '#d32f2f',
                                        borderColor: '#d32f2f',
                                        '&:hover': {
                                            backgroundColor: '#d32f2f',
                                            color: 'white',
                                            borderColor: '#d32f2f',
                                        },
                                    }}
                                >
                                    Remove from Cart
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
