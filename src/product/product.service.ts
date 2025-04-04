import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { ProductFilterInput } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({ data });
  }

  async findAll(filter?: ProductFilterInput) {
    const where: Prisma.ProductWhereInput = {};
    if (filter) {
      if (filter.name) {
        where.name = { contains: filter.name };
      }
      if (filter.desc) {
        where.desc = { contains: filter.desc };
      }
    }
    return await this.prisma.product.findMany({
      where,
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    // Check if product exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Update only the provided fields
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
