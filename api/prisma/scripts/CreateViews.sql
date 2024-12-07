CREATE VIEW user_role AS
    SELECT
        r.id AS role_id,
        r.name AS role_name,
        r.abrv AS role_abrv,
        u.id AS user_id,
        u.email AS user_email,
        u.first_name AS user_first_name,
        u.last_name AS user_last_name
    FROM "user" AS u
    INNER JOIN role_member AS rm 
        ON u.id = rm.member_id
        AND rm.member_type = 'user'
    INNER JOIN role AS r
        ON rm.role_id = r.id;

CREATE VIEW group_role AS
    SELECT
        r.id AS role_id,
        r.name AS role_name,
        r.abrv AS role_abrv,
        g.id AS group_id,
        g.name AS group_name
    FROM "group" AS g
    INNER JOIN role_member AS rm 
        ON g.id = rm.member_id
        AND rm.member_type = 'group'
    INNER JOIN role AS r
        ON rm.role_id = r.id;

CREATE VIEW user_permission AS
    SELECT 
        u.id AS user_id,
        u.email AS user_email,
        u.first_name AS user_first_name,
        u.last_name AS user_last_name,
        p.id AS permission_id,
        p.name AS permission_name,
        p.abrv AS permission_abrv,
        p.permission_type AS permission_type,
        p.app_type AS app_type
    FROM "user" AS u
    INNER JOIN permission_member AS pm 
        ON u.id = pm.member_id
        AND pm.member_type = 'user'
    INNER JOIN permission AS p 
        ON pm.permission_id = p.id;

CREATE VIEW group_permission AS
    SELECT 
        g.id AS group_id,
        g.name AS group_name,
        p.id AS permission_id,
        p.name AS permission_name,
        p.abrv AS permission_abrv,
        p.permission_type AS permission_type,
        p.app_type AS app_type
    FROM "group" AS g
    INNER JOIN permission_member AS pm 
        ON g.id = pm.member_id
        AND pm.member_type = 'group'
    INNER JOIN permission AS p
        ON pm.permission_id = p.id;

CREATE VIEW role_permission AS
    SELECT 
        r.id AS role_id,
        r.name AS role_name,
        r.abrv AS role_abrv,
        p.id AS permission_id,
        p.name AS permission_name,
        p.abrv AS permission_abrv,
        p.permission_type AS permission_type,
        p.app_type AS app_type
    FROM role AS r
    INNER JOIN permission_member AS pm 
        ON r.id = pm.member_id
        AND pm.member_type = 'role'
    INNER JOIN permission AS p
        ON pm.permission_id = p.id;

CREATE VIEW user_group AS 
    SELECT 
        u.id AS user_id,
        u.email AS user_email,
        u.first_name AS user_first_name,
        u.last_name AS user_last_name,
        g.id AS group_id,
        g.name AS group_name
    FROM "user" AS u
    INNER JOIN group_member AS gm
        ON u.id = gm.member_id
        AND gm.member_type = 'user'
    INNER JOIN "group" AS g
        ON gm.group_id = g.id;

CREATE VIEW site_group AS
    SELECT 
        s.id AS site_id,
        s.name AS site_name,
        g.id AS group_id,
        g.name AS group_name
    FROM site AS s
    INNER JOIN group_member AS gm
        ON s.id = gm.member_id
        AND gm.member_type = 'site'
    INNER JOIN "group" AS g
        ON gm.group_id = g.id;

CREATE VIEW calculated_permission AS
    WITH user_permissions AS (
        -- Permissions directly assigned to the user
        SELECT 
            p.id AS permission_id, 
            pm.member_id AS user_id, 
            CASE 
                WHEN u.start_date <= CURRENT_DATE THEN true
                ELSE false
            END AS is_effective,
            'permission' AS inherited_by
        FROM permission p
        INNER JOIN permission_member pm 
            ON p.id = pm.permission_id 
            AND pm.member_type = 'user'
        INNER JOIN "user" u 
            ON pm.member_id = u.id  -- Join with the user table to use start_date
	
        UNION

        -- Permissions inherited via group membership
        SELECT 
            p.id AS permission_id, 
            gm.member_id AS user_id, 
            CASE 
                WHEN u.start_date <= CURRENT_DATE THEN true
                ELSE false
            END AS is_effective,
            'Group: ' || g.name AS inherited_by
        FROM permission p
        INNER JOIN permission_member pm 
            ON p.id = pm.permission_id 
            AND pm.member_type = 'group'
        INNER JOIN "group" g 
            ON pm.member_id = g.id 
        INNER JOIN group_member gm 
            ON g.id = gm.group_id 
            AND gm.member_type = 'user'
        INNER JOIN "user" u 
            ON gm.member_id = u.id  -- Join with the user table to use start_date

        UNION

        -- Permissions inherited via group/role membership
        SELECT 
            p.id AS permission_id, 
            ugm.member_id AS user_id, 
            CASE 
                WHEN u.start_date <= CURRENT_DATE THEN true
                ELSE false
            END AS is_effective,
            'Group: ' || g.name || ' Role: ' || r.name AS inherited_by
        FROM permission p
        INNER JOIN permission_member pm 
            ON p.id = pm.permission_id 
            AND pm.member_type = 'role'
        INNER JOIN role r 
            ON pm.member_id = r.id
        INNER JOIN role_member grm 
            ON r.id = grm.role_id 
            AND grm.member_type = 'group'
        INNER JOIN "group" g 
            ON grm.member_id = g.id
        INNER JOIN group_member ugm 
            ON g.id = ugm.group_id 
            AND ugm.member_type = 'user'
        INNER JOIN "user" u 
            ON ugm.member_id = u.id  -- Join with the user table to use start_date

        UNION

        -- Permissions inherited via role membership
        SELECT 
            p.id AS permission_id, 
            urm.member_id AS user_id, 
            CASE 
                WHEN u.start_date <= CURRENT_DATE THEN true
                ELSE false
            END AS is_effective,
            'Role: ' || r.name AS inherited_by
        FROM permission p
        INNER JOIN permission_member pm 
            ON p.id = pm.permission_id 
            AND pm.member_type = 'role'
        INNER JOIN role r 
            ON pm.member_id = r.id
        INNER JOIN role_member urm 
            ON r.id = urm.role_id 
            AND urm.member_type = 'user'
        INNER JOIN "user" u 
            ON urm.member_id = u.id  -- Join with the user table to use start_date
        
    )
    SELECT DISTINCT 
        u.id AS user_id,
        u.email AS user_email,
        u.first_name AS user_first_name,
        u.last_name AS user_last_name,
        p.id AS permission_id,
        p.name AS permission_name,
        p.abrv AS permission_abrv,
        p.permission_type AS permission_type,
        p.app_type AS app_type,
        is_effective,
        inherited_by
    FROM user_permissions
    JOIN "user" u 
        ON user_id = u.id
    JOIN permission p 
        ON permission_id = p.id;

CREATE VIEW group_site AS 
WITH RECURSIVE GroupHierarchy AS (
    SELECT 
        id as group_id, 
		name as group_name,
		id as child_group_id
    FROM 
        public.group as g
    UNION    
    SELECT 
        gh.group_id, 
        gh.group_name, 
		gm.member_id as child_group_id
    FROM 
        GroupHierarchy AS gh
    inner JOIN 
        public.group_member AS gm 
    ON 
        gm.group_id = gh.child_group_id 
    AND 
        gm.member_type = 'group'
)
CYCLE group_id, child_group_id SET is_cycle USING path
SELECT distinct gh.group_id, gm.member_id as site_id FROM GroupHierarchy as gh
inner join public.group_member as gm on gm.group_id=gh.child_group_id and gm.member_type='site';
