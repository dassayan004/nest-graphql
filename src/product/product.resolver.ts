import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productService.create(data);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.productService.findOne(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateProductInput,
  ) {
    return this.productService.update(id, data);
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => ID }) id: string) {
    return await this.productService.remove(id);
  }
}
