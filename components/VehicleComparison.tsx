"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const vehicles = [
  {
    id: 1,
    name: "Tesla Model S",
    price: "75,000 USD",
    image: "/car1.jpg",
    range: "400 miles",
    acceleration: "0-60 mph in 3.1s",
    topSpeed: "155 mph",
  },
  {
    id: 2,
    name: "Porsche 911",
    price: "120,000 USD",
    image: "/car2.jpg",
    range: "N/A",
    acceleration: "0-60 mph in 2.8s",
    topSpeed: "205 mph",
  },
  {
    id: 3,
    name: "Audi e-tron",
    price: "65,000 USD",
    image: "/car3.jpg",
    range: "350 miles",
    acceleration: "0-60 mph in 4.5s",
    topSpeed: "140 mph",
  },
]

export default function VehicleComparison() {
  const [vehicle1, setVehicle1] = useState(vehicles[0])
  const [vehicle2, setVehicle2] = useState(vehicles[1])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select First Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) =>
                setVehicle1(vehicles.find((v) => v.id === Number.parseInt(value)) || vehicles[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Second Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) =>
                setVehicle2(vehicles.find((v) => v.id === Number.parseInt(value)) || vehicles[1])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <Image src={vehicle1.image} alt={vehicle1.name} width={400} height={300} className="rounded-lg" />
              <h3 className="text-xl font-bold mt-4">{vehicle1.name}</h3>
            </div>
            <div>
              <Image src={vehicle2.image} alt={vehicle2.name} width={400} height={300} className="rounded-lg" />
              <h3 className="text-xl font-bold mt-4">{vehicle2.name}</h3>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Specification</TableHead>
                <TableHead>{vehicle1.name}</TableHead>
                <TableHead>{vehicle2.name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{vehicle1.price}</TableCell>
                <TableCell>{vehicle2.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Range</TableCell>
                <TableCell>{vehicle1.range}</TableCell>
                <TableCell>{vehicle2.range}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Acceleration</TableCell>
                <TableCell>{vehicle1.acceleration}</TableCell>
                <TableCell>{vehicle2.acceleration}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Top Speed</TableCell>
                <TableCell>{vehicle1.topSpeed}</TableCell>
                <TableCell>{vehicle2.topSpeed}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

