import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { modelContext } from '../../contexts/models-context';
import { MainContext } from '../../contexts/main-context';
import { makeStyles } from '@material-ui/core/styles';
import { getOrders } from '../../services/api-service/orders-service';

export default function OrdersPage() {

    useEffect(() => {
        getOrders().then((res) => console.log(res));
    });

    return (
        null
    );
}