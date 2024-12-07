import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./common/database/prisma/prisma.module";
// import { CommonAuthenticationModule } from "./common/authentication/authentication.module";
// import { CommonAuthorizationModule } from "./common/authorization/authorization.module";
import { UsersModule } from "./modules/users/users.module";
// import { GroupsModule } from "./modules/group/groups.module";
// import { SitesModule } from "./modules/sites/sites.module";
import { ConfigModule } from "@nestjs/config";
// import { UserPermissionsModule } from "./modules/user-permissions/user-permissions.module";
// import { UserRoleModule } from "./modules/user-roles/user-roles.module";
// import { UserPreferencesModule } from "./modules/user-preferences/user-preferences.module";
import { CacheModule } from "./common/cache/cache.module";
import { LoggerModule } from "./common/logger/logger.module";
// import { OrganizationsModule } from "./modules/organizations/organizations.module";
// import { UserOrganizationModule } from "./modules/user-organizations/user-organizations.module";
// import { CommonAccessModule } from "./common/access/common-access.module";
// import { CommonFilterModule } from "./common/filter/filter.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/exception-filters/http-exception.filter";
import { UtilModule } from "./common/utils/util.module";
import { UsersController } from './modules/users/users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SurveysController } from "./modules/surverys/surveys.controller";
import { UsersService } from "./modules/users/users.service";
import { SurveyService } from "./modules/surverys/surveys.service";
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "super_secret_key",
      signOptions: { expiresIn: "12h" },
    }),
    ConfigModule.forRoot(),
    CacheModule,
    PrismaModule,
    LoggerModule,
    // UsersModule,
    // EventEmitterModule.forRoot(),
    // CommonAuthenticationModule,
    // CommonAuthorizationModule,
    // GroupsModule,
    // SitesModule,
    // RolesModule,
    // PermissionsModule,
    // UserPermissionsModule,
    // UserRoleModule,
    // GroupMembersModule,
    // UserPreferencesModule,
    // OktaModule,
    // DevicesModule,
    // MqttModule,
    // MqttTestModule,
    // OrganizationsModule,
    // UserOrganizationModule,
    // SigmaModule,
    // CommonAccessModule,
    // CommonFilterModule,
    // AlarmsModule,
    // SearchinatorModule,
    UtilModule,
  ],
  controllers: [AppController,UsersController, SurveysController],
  providers: [
    PrismaService,
    AppService,
    UsersService,
    SurveyService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
