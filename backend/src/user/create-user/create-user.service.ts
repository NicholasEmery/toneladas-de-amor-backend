import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserUpheldDto } from "../dto/createUser/createUserUpheld.dto";
import { PrismaService } from "../../database/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDonatorDto } from "../dto/createUser/createUserDonator.dto";
import { CreateUserColaboratorDto } from "../dto/createUser/createUserColaborator.dto";
import { CreateUserAdminDto } from "../dto/createUser/createUserAdmin.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async createUserUpheld(createUserUpheldDto: CreateUserUpheldDto): Promise<boolean> {
    const { name, email, password, phone, role, fieldsRole } = createUserUpheldDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        tokenVersion: 1,
      },
    });

    if (!user) {
      throw new BadRequestException("Error creating user");
    }

    return true;
  }

  async createUserDonator(createUserDonatorDto: CreateUserDonatorDto): Promise<boolean> {
    const { name, email, password, phone, role, fieldsRole } = createUserDonatorDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        tokenVersion: 1,
      },
    });

    if (!user) {
      throw new BadRequestException("Error creating user");
    }

    return true;
  }

  async createUserColaborator(createUserColaboratorDto: CreateUserColaboratorDto): Promise<boolean> {
    const { name, email, password, phone, role, fieldsRole } = createUserColaboratorDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        tokenVersion: 1,
      },
    });

    if (!user) {
      throw new BadRequestException("Error creating user");
    }

    return true;
  }

  async createUserAdmin(createUserAdminDto: CreateUserAdminDto): Promise<boolean> {
    const { name, email, password, phone, role } = createUserAdminDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        tokenVersion: 1,
      },
    });

    if (!user) {
      throw new BadRequestException("Error creating user");
    }

    return true;
  }
}
