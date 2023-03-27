
# TodoApp

jednoducha aplikaica pre ludi ktori si potrebuju nieco zapisat




## Spustenie

Pre spustenie apliakcie zadajte tento command

```bash
  docker compose up --build
```


## API Reference

#### Vsetky tasky

```http
  http://localhost:5252/
```

#### Vsetky tasky ktore niesu hotove

```http
  http://localhost:5252/notdone
```


#### Vlozenie noveho tasku

```http
  http://localhost:5252/title/Buy%20groceries/description/Milk,%20bread,%20eggs
```

| Parameter          | Type     | Description   | Value             |
| :----------------- | :------- | :------------ | :-----------------|
| `title`            | `string` | **Required**. | Buy groceries     |
| `description`      | `string` | **Required**. | Milk, bread, eggs |



#### Vymazanie tasku

```http
  http://localhost:5252/id/3/delete
```

| Parameter       | Type     | Description   | Value             |
| :-------------- | :------- | :------------ | :-----------------|
| `id`            | `string` | **Required**. | 3                 |



#### Update tasku

```http
  http://localhost:5252/id/2/update
```

| Parameter       | Type     | Description   | Value             |
| :-------------- | :------- | :------------ | :-----------------|
| `id`            | `string` | **Required**. | 2                 |





