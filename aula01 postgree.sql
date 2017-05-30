create table produtos
(
	prd_codigo serial not null primary key,
	prd_descricao text not null,
	prd_qtd integer not null,
	prd_valor numeric(10,2) not null
);

-- Insert --

insert into produtos (prd_descricao, prd_qtd, prd_valor)
values ('Lapis', 100, 1.5);
	
select * from produtos;

-- Procedure --

create or replace function cadProd
(
	text, integer, numeric
)
returns void
as
$$
	insert into produtos (prd_descricao, prd_qtd, prd_valor)
	values ($1, $2, $3);
$$
language SQL;

--Teste--

select cadProd ('Caderno', 1000, 10);
select * from produtos;

-- View --

create view v_prods
as
	select p.prd_codigo Codigo,
	       p.prd_descricao Produto,
	       p.prd_qtd Estoque,
	       p.prd_valor Preço
	from produtos p;

--Teste--
select * from v_prods;

select 200 * (1 + 10.0/100);

create or replace function reajustar
(
	valor numeric, taxa numeric
)
returns numeric
as
$$
	select valor * (1 + taxa/100);
$$
language SQL;

select reajustar(200, -15);

select p.*, reajustar(prd_valor, -10) Simulacao from produtos p


update produtos set 
	prd_valor = reajustar(prd_valor, 1)

-------------------

create or replace function reajustar2
(
	valor numeric, taxa numeric
)
returns numeric
as
$$
	declare
	   valor_reajustado numeric;
	begin
	   valor_reajustado := (valor * (1 + taxa/100));
	   return valor_reajustado;
	end
$$
language PLPGSQL;

select reajustar2(200, -15);


---- function big int ----

create or replace function countProd (numeric) returns bigint
as
$$
	select count(*) from produtos where prd_valor > $1;
$$
language SQL;




