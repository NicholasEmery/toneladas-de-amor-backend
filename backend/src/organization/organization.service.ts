import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto, adminId: string) {
    return await this.prisma.organization.create({
      data: {
        ...createOrganizationDto,
        adminId, // Usa o adminId extraído do token
      },
    });
  }

  async getOrganizations(
    userId: string,
  ): Promise<{ message: string; organizations: Organization[] }> {
    const userOrganizations = await this.prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: userId, // Filtra organizações onde o usuário faz parte
          },
        },
      },
    });

    if (!userOrganizations) {
      throw new NotFoundException(`User with ID does not exist.`);
    }

    if (userOrganizations.length === 0) {
      return {
        message: 'No organizations found for this user.',
        organizations: [],
      };
    }

    return {
      message: 'Organizations found.',
      organizations: userOrganizations,
    };
  }

  async getOrganization(
    nameOrganization: string,
  ): Promise<{ message: string; organization: Organization }> {
    const organization = await this.prisma.organization.findFirstOrThrow({
      where: {
        name: nameOrganization,
      },
    });
      
    if (!organization) {
      throw new NotFoundException(`Organization with name ${nameOrganization} does not exist.`);
    }

    return {
      message: 'Organization found.',
      organization: organization,
    };
  }

  async update(updateOrganizationDto: UpdateOrganizationDto, userId: string) {
    return await this.prisma.organization.update({
      where: {
        id: userId,
      },
      data: {
        ...updateOrganizationDto,
      },
    });
  }

  async deleteOrganization(idOrganization: string): Promise<{ message: string; organizationId: string }> {
    const organization = await this.prisma.organization.delete({
      where: {
        id: idOrganization,
      },
    });
      
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${idOrganization} does not exist.`);
    }

    return {
      message: 'Organization deleted successfully.',
      organizationId: idOrganization,
    };
  }
}
