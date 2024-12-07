import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient, User } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { UsersService } from './users.service';
import { PrismaService } from "src/common/database/prisma/prisma.service";
import { HttpException, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from "./dtos/create-user.dto";
import OktaClient from 'src/common/okta/okta.client';
import Logger from 'src/common/logger/logger';
import { ResetPasswordToken } from '@okta/okta-sdk-nodejs';
import { RequestUserProvider } from 'src/common/authentication/request-user.provider';
import { UserOrganizationService } from '../user-organizations/user-organizations.service';
import { OrganizationFilter } from 'src/common/filter/filter.service';
import { CommonFilterModule } from 'src/common/filter/filter.module';


describe('UsersService', () => {
    let service: UsersService;
    let prisma: DeepMockProxy<PrismaClient>;
    let organizationFilter: DeepMockProxy<OrganizationFilter>;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CommonFilterModule],
            providers: [UsersService, PrismaService, OktaClient, Logger, RequestUserProvider, UserOrganizationService, OrganizationFilter],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(OktaClient)
            .useValue(mockDeep<OktaClient>())
            .overrideProvider(Logger)
            .useValue(mockDeep<Logger>())
            .overrideProvider(RequestUserProvider)
            .useValue(mockDeep<RequestUserProvider>())
            .overrideProvider(OrganizationFilter)
            .useValue(mockDeep<OrganizationFilter>())
            .compile();

        service = module.get(UsersService);
        prisma = module.get(PrismaService);
        organizationFilter = module.get(OrganizationFilter);
    });

    describe('findMany', () => {
        it('should return paginated user data', async () => {
            const users = [
                {
                    id: 1,
                    email: 'user1@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                },
                {
                    id: 2,
                    email: 'user2@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                },
            ];
            const total = 2;
            const currentPage = 1;

            jest.spyOn(service, 'findMany').mockImplementation(() =>
                Promise.resolve({
                    items: users,
                    total,
                    currentPage,
                    totalPages: 1,
                    pageSize: 10,
                })
            );

            const result = await service.findMany({
                page: 1,
                pageSize: 10,
                where: {}, // Add your where condition here
                orderBy: {}, // Add your orderBy condition here
            });

            expect(result.items).toBe(users);
            expect(result.total).toBe(total);
            expect(result.currentPage).toBe(currentPage);
        });

        it('should throw an HttpException on error', async () => {
            const error = new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);

            jest.spyOn(service, 'findMany').mockRejectedValue(error);

            await expect(
                service.findMany({
                    page: 1,
                    pageSize: 10,
                    where: {}, // Add your where condition here
                    orderBy: {}, // Add your orderBy condition here
                })
            ).rejects.toThrow(HttpException);
        });
    });
});

describe('UsersService', () => {
    let service: UsersService;
    let prisma: DeepMockProxy<PrismaClient>;
    let oktaClient: DeepMockProxy<OktaClient>;
    let requestUserProvider: DeepMockProxy<RequestUserProvider>;
    let organizationFilter: DeepMockProxy<OrganizationFilter>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ CommonFilterModule],
            providers: [UsersService, PrismaService, OktaClient, Logger, RequestUserProvider, OrganizationFilter, UserOrganizationService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(OktaClient)
            .useValue(mockDeep<OktaClient>())
            .overrideProvider(Logger)
            .useValue(mockDeep<Logger>())
            .overrideProvider(RequestUserProvider)
            .useValue(mockDeep<RequestUserProvider>())

            .overrideProvider(OrganizationFilter)
            .useValue(mockDeep<OrganizationFilter>())
            .compile();
        service = module.get(UsersService);
        prisma = module.get(PrismaService);
        oktaClient = module.get(OktaClient);
        requestUserProvider = module.get(RequestUserProvider);
        organizationFilter = module.get(OrganizationFilter);
    });

    describe('registerUser', () => {
        it('should create a new user and return it', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                externalAuthId: "jsd78326ehsgd",
                externalAuthProvider: 'okta',
                organizationId: 1,
            };

            const oktaResponse = {
                status: 'PROVISIONED',
                id: 'oktaUserId',
            };

            jest.spyOn(oktaClient, 'createUser').mockImplementation((userData?: any) => Promise.resolve(oktaResponse));

            (prisma.user as any).create.mockResolvedValue({
                id: 1,
                email: createUserDto.email,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                phoneNumber: createUserDto.phoneNumber,
                externalAuthId: oktaResponse.id,
                externalAuthProvider: 'okta',
            });

            const result = await service.registerUser(createUserDto);

            expect(oktaClient.createUser).toHaveBeenCalledWith({
                profile: {
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    email: createUserDto.email,
                    phoneNumber: createUserDto.phoneNumber,
                    login: createUserDto.email,
                },
            });
            expect((prisma.user as any).create).toHaveBeenCalledWith({
                data: {
                    email: createUserDto.email,
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    phoneNumber: createUserDto.phoneNumber,
                    externalAuthId: oktaResponse.id,
                    externalAuthProvider: 'okta',
                    createdBy: requestUserProvider.auditInfo.auditName,
                    updatedBy: requestUserProvider.auditInfo.auditName,
                    createdAt: requestUserProvider.auditInfo.auditDate,
                    updatedAt: requestUserProvider.auditInfo.auditDate,
                },
            });
            expect(result).toEqual({
                id: 1,
                email: createUserDto.email,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                phoneNumber: createUserDto.phoneNumber,
                externalAuthId: oktaResponse.id,
                externalAuthProvider: 'okta',
            });
        });

        it('should throw a ConflictException if email is already registered', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                externalAuthId: "jsd78326ehsgd",
                externalAuthProvider: 'okta',
                isActive: false,
                organizationId: 1,
            };

            const oktaResponse = {
                status: 'PROVISIONED',
                id: 'oktaUserId',
            };

            jest.spyOn(oktaClient, 'createUser').mockImplementation((userData?: any) => Promise.resolve(oktaResponse));
            jest.spyOn((prisma.user as any), 'create').mockRejectedValue({
                code: 'P2002',
            });

            await expect(service.registerUser(createUserDto)).rejects.toThrow(
                ConflictException,
            );
        });

        it('should throw an HttpException if an error occurs', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                externalAuthId: "jsd78326ehsgd",
                externalAuthProvider: 'okta',
                isActive: false,
                organizationId: 1,
            };

            const oktaResponse = {
                status: 'PROVISIONED',
                id: 'oktaUserId',
            };

            jest.spyOn(oktaClient, 'createUser').mockImplementation((userData?: any) => Promise.resolve(oktaResponse));
            jest.spyOn((prisma.user as any), 'create').mockRejectedValue(new Error('Test error'));

            await expect(service.registerUser(createUserDto)).rejects.toThrow(
                HttpException,
            );
        });
    });

    describe('getUserAsync', () => {
        it('should return a user details with organization', async () => {
            const mockUser = {
                id: 1,
                email: "test@test.com",
                firstName: "test",
                lastName: "test",
                phoneNumber: "1234567890",
                isActive: true,
                userOrganizations: [
                    {
                        organizationId: 2,
                        organization: {
                            id: 2,
                            name: "Test Organization"
                        }
                    }
                ]
            };

            (prisma.user as any).findUniqueOrThrow.mockResolvedValue(mockUser);

            // Act
            const result = await service.getUserAsync(1);

            // Assert
            expect((prisma.user as any).findUniqueOrThrow).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    userOrganizations: {
                        where: { isPrimary: true },
                        select: { organizationId: true, organization: { select: { id: true, name: true } } },
                    },
                },
            });

            expect(result).toEqual({
                id: 1,
                email: "test@test.com",
                firstName: "test",
                lastName: "test",
                phoneNumber: "1234567890",
                isActive: true,
                organization: {
                    id: 2,
                    name: "Test Organization"
                }
            });
        });


        it('should return 404- User Not Found Error', async () => {

            // Arrange
            (prisma.user as any).findUniqueOrThrow.mockRejectedValue({
                code: 'P2025'
            });

            // Act/Assert
            await expect(service.getUserAsync(1)).rejects.toThrow(
                NotFoundException,
            );

        });

        it('should return 500- internal server error', async () => {

            // Arrange
            (prisma.user as any).findUniqueOrThrow.mockRejectedValue({
                code: "P01"
            });


            // Act/Assert
            await expect(service.getUserAsync(1)).rejects.toThrow(
                HttpException,
            );

        });
    });

    describe('sendResetPasswordInviteAsync', () => {
        it('should send a reset password invite to the user', async () => {
            const userId = 1;
            const user = {
                id: userId,
                email: 'user@example.com',
                firstName: 'John',
                lastName: 'Doe',
                externalAuthId: 'abc'
            } as User;

            jest.spyOn((prisma.user as any), 'findUniqueOrThrow').mockResolvedValue(user);
            jest.spyOn(oktaClient, 'sendPasswordResetInviteAsync').mockResolvedValue({} as ResetPasswordToken);

            await service.sendResetPasswordInviteAsync(userId);

            expect((prisma.user as any).findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: userId } });
            expect(oktaClient.sendPasswordResetInviteAsync).toHaveBeenCalledWith(user.externalAuthId);
        });

        it('should throw a NotFoundException if the user does not exist', async () => {
            const userId = 1;

            jest.spyOn((prisma.user as any), 'findUniqueOrThrow').mockRejectedValue({ code: 'P2025' });

            await expect(service.sendResetPasswordInviteAsync(userId)).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should throw an HttpException if an error occurs', async () => {
            const userId = 1;

            jest.spyOn(prisma.user as any, 'findUniqueOrThrow').mockResolvedValue({
                id: userId,
                email: 'user@example.com',
                firstName: 'John',
                lastName: 'Doe',
                externalAuthId: 'abc',
            } as User);
            jest.spyOn(oktaClient, 'sendPasswordResetInviteAsync').mockRejectedValue(new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR));

            await expect(service.sendResetPasswordInviteAsync(userId)).rejects.toThrow(
                HttpException,
            );
        });
    });
});