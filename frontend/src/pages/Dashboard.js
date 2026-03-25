import React, { useState, useEffect } from 'react';
import productService from '../services/product.service';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();
    
    // Form for adding product (Admin only)
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await productService.getAllProducts();
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await productService.deleteProduct(id);
            loadProducts();
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
        setShowAddForm(true);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            await productService.updateProduct(editingProduct.id, newProduct);
        } else {
            await productService.createProduct(newProduct);
        }
        setShowAddForm(false);
        setEditingProduct(null);
        setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
        loadProducts();
    };

    if (loading) return (
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
            <div className="loader">Loading refined products...</div>
        </div>
    );

    return (
        <div className="container animate-in">
            {isAdmin && (
                <div className="glass animate-in" style={{
                    padding: '12px 24px', 
                    marginBottom: '30px', 
                    background: 'rgba(139, 92, 246, 0.15)', 
                    border: '1px solid var(--primary)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <span className="badge" style={{background: 'var(--primary)', color: 'white'}}>ADMIN MODE</span>
                    <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text)'}}>You have elevated permissions to manage the product catalog.</p>
                </div>
            )}

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
                <div>
                    <h1 style={{margin: 0, fontSize: '2.5rem', fontWeight: 800}}>Featured Collection</h1>
                    <p style={{color: 'var(--text-muted)', marginTop: '5px'}}>Premium curation of tech and lifestyle products</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={() => {
                        setShowAddForm(!showAddForm);
                        if (showAddForm) setEditingProduct(null);
                    }}>
                        {showAddForm ? 'Exit Editor' : '⚡ Create New Listing'}
                    </button>
                )}
            </div>

            {showAddForm && (
                <div className="glass animate-in" style={{padding: '32px', marginBottom: '40px', border: '1px solid var(--primary)'}}>
                    <h3 style={{marginTop: 0, marginBottom: '24px'}}>{editingProduct ? 'Update Listing' : 'New Product Listing'}</h3>
                    <form onSubmit={handleAddProduct} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                        <div className="input-group">
                            <label>Product Name</label>
                            <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. iPhone 15 Pro" required />
                        </div>
                        <div className="input-group">
                            <label>Price (USD)</label>
                            <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} placeholder="999" required />
                        </div>
                        <div className="input-group" style={{gridColumn: 'span 2'}}>
                            <label>Description</label>
                            <input type="text" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} placeholder="Describe the product experience..." />
                        </div>
                        <div className="input-group" style={{gridColumn: 'span 2'}}>
                            <label>Media URL</label>
                            <input type="text" value={newProduct.imageUrl} onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder="Paste image address..." />
                        </div>
                        <div style={{gridColumn: 'span 2', display: 'flex', gap: '15px'}}>
                            <button type="submit" className="btn btn-primary" style={{flexGrow: 1}}>{editingProduct ? 'Update Product' : 'Publish Product'}</button>
                            {editingProduct && (
                                <button type="button" className="btn btn-outline" onClick={() => {
                                    setEditingProduct(null);
                                    setShowAddForm(false);
                                    setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
                                }}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="product-grid">
                {products.length === 0 ? (
                    <div style={{gridColumn: 'span 3', textAlign: 'center', padding: '100px 0'}}>
                        <h2 style={{color: 'var(--text-muted)'}}>No products found</h2>
                        <p>Get started by adding your first premium product.</p>
                    </div>
                ) : products.map((p, index) => (
                    <div key={p.id} className="glass product-card animate-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="product-image-wrapper">
                            <img src={p.imageUrl || 'https://via.placeholder.com/600?text=Product+Preview'} alt={p.name} className="product-image" />
                            <div style={{position: 'absolute', top: '15px', right: '15px'}}>
                                <span className="badge">Premium</span>
                            </div>
                        </div>
                        <div className="product-content">
                            <h3>{p.name}</h3>
                            <p className="product-description">{p.description}</p>
                            <div className="price-row">
                                <span className="price">${p.price}</span>
                                {isAdmin && (
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <button className="btn btn-outline" onClick={() => handleEdit(p)} style={{padding: '8px 12px', fontSize: '0.8rem'}}>Edit</button>
                                        <button className="btn btn-outline" onClick={() => handleDelete(p.id)} style={{padding: '8px 12px', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444'}}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
