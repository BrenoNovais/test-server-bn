-- teste_bruto - trigger autoincrement dependente de outra coluna.

CREATE OR REPLACE FUNCTION set_autoincrement_users() RETURNS TRIGGER AS $sql$
BEGIN
    NEW.id_user = coalesce(max(id_user) + 1, 1) FROM users WHERE id_tenant = NEW.id_tenant;
    RETURN NEW;
END;
$sql$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION set_autoincrement_backups() RETURNS TRIGGER AS $sql$
BEGIN
    NEW.id_backup = coalesce(max(id_backup) + 1, 1) FROM backups WHERE id_tenant = NEW.id_tenant;
    RETURN NEW;
END;
$sql$ LANGUAGE plpgsql STABLE;