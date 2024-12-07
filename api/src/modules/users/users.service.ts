import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, User } from ".prisma/client";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUsertDto } from "./dtos/update-user.dto";
import { ViewUserDto } from "./dtos/view-user.dto";
import { PrismaService } from "src/common/database/prisma/prisma.service";
import { PagedRequest } from "src/common/utils/pagination/dtos/paged-request.dto";
import {
  IPaginationResult,
  paginate,
} from "src/common/utils/pagination/pagination";
import Logger from "src/common/logger/logger";
// import { RequestUserProvider } from "src/common/authentication/request-user.provider";
// import { UserOrganizationService } from "../user-organizations/user-organizations.service";
// import { OrganizationFilter } from "src/common/filter/filter.service";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    // private readonly organizationFilter: OrganizationFilter,
    // private readonly userOrganizationService: UserOrganizationService,
    private logger: Logger,
    // private readonly userProvider: RequestUserProvider,
  ) {
    logger.setContext(UsersService.name);
  }

  // async create user
  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    try {
        // const auditInfo = this.userProvider.auditInfo;
        const { organizationId, ...restUserCreatedto } = createUserDto;
        // create new user using prisma client
        const newUser = await this.prisma.user.create({
          data: {
            ...restUserCreatedto,
          },
        });
        return newUser;
    } catch (error) {
      this.logger.error(error);
      // check if email already registered and throw error
      if (error.code === "P2002") {
        throw new ConflictException("Email already registered");
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
/* 
  async getUserAsync(id: number): Promise<ViewUserDto> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id }
      });
      const userdto = new ViewUserDto();
      userdto.id = user.id;
      userdto.firstName = user.firstName;
      userdto.lastName = user.lastName;
      userdto.email = user.email;
      userdto.phoneNumber = user.phoneNumber;
      userdto.isActive = user.isActive;
      return userdto;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`User not found`);
      }
      throw new HttpException(error, 500);
    }
  } */

/*   // async find unique user by email
  async findUniqueByEmailOrThrow(email: string): Promise<User> {
    try {
      // find user by id. If not found, throw error
      return await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      this.logger.error(error);
      // check if user not found and throw error
      if (error.code === "P2025") {
        throw new NotFoundException(`User not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
 *//* 
  //async updateUser
  async updateUser(
    id: number,
    updateUserDto: UpdateUsertDto,
  ): Promise<ViewUserDto> {
    try {
      // const auditInfo = this.userProvider.auditInfo;
      // find user by id. If not found, throw error
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      const { organizationId, ...restUserUpdatedto } = updateUserDto;

      let date = restUserUpdatedto.startDate;
        restUserUpdatedto.startDate = new Date(date);

      //update user using prisma client
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...restUserUpdatedto,
          // updatedBy: auditInfo.auditName,
          // updatedAt: auditInfo.auditDate,
        },
      });

      //remove password from response
      //delete updatedUser.password;

      // update user primary organization
   

      return await this.getUserAsync(id);
    } catch (error) {
      this.logger.error(error);
      // check if user not found and throw error
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // check if email already registered and throw error
      if (error.code === "P2002") {
        throw new ConflictException("Email already registered");
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  } */
  // async deleteUser
  /* async deleteUser(id: number): Promise<string> {
    try {
      // find user by id. If not found, throw error
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      // Soft delete user by setting isDeleted to true
        await this.prisma.user.update({
          where: { id },
          data: { isDeleted: true },
        });
      return `User with id ${user.id} marked as deleted and removed from Okta`;
    } catch (error) {
      this.logger.error(error);
      // Handle Prisma known errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new HttpException(
            `Foreign key constraint violation. Please handle related records first.`,
            400,
          );
        }
        if (error.code === "P2025") {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }

      // Throw other errors
      throw new HttpException(error.message || "Internal server error", 500);
    }
  } */
  async getUser(
    // where: Prisma.UserWhereUniqueInput,
    // include?: Prisma.UserInclude,
  ): Promise<User[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(error, 500);
    }
  }

  

  // update user status
  /* async updateUserStatus(id: number, status: string): Promise<any> {
    try {
      // find user by id. If not found, throw error
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });


      // update user status using prisma client
        await this.prisma.user.update({
          where: { id },
          data: {
            isActive: status === "true" ? true : false,
          },
        });
        return { message: `User with id ${id} have been updated` };
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  } */

  }
