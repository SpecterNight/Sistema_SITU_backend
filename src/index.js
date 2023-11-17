import express from 'express'
import accountRoutes from './routes/account.routes.js'
import cardRoutes from './routes/card.routes.js'
import rechargePointRoutes from './routes/recharge_point.routes.js'
import busRoutes from './routes/bus.routes.js'
import rolRoutes from './routes/rol.routes.js'

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Credentials", '*');
    next();
  });

app.use(express.json())

app.use('/api/v1',accountRoutes)
app.use('/api/v1',cardRoutes)
app.use('/api/v1',rechargePointRoutes)
app.use('/api/v1',busRoutes)
app.use('/api/v1',rolRoutes)

app.listen(3006)

console.log('Server on port',3006)