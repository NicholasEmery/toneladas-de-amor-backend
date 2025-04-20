import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
  @Post('organization/create')
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return await this.organizationService.create(createOrganizationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('organizations')
  async getOrganization(@Request() req) {
    const userId = req.user.id;
    return await this.organizationService.getOrganizations(userId);
  }

  @UseGuards(AuthGuard)
  @Get('organization')
  async getOrganizationByName(@Body() nameOrganization: string) {
    return await this.organizationService.getOrganization(nameOrganization);
  }

  @UseGuards(AuthGuard)
  @Patch('organization/update')
  async updateOrganization(
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return await this.organizationService.update(updateOrganizationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('organization/delete')
  async deleteOrganization(@Body() idOrganization: string) {
    return await this.organizationService.deleteOrganization(idOrganization);
  }
}
