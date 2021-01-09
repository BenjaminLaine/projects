/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   libft.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/19 17:45:27 by blaine            #+#    #+#             */
/*   Updated: 2019/11/19 19:10:19 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void	ft_putendl(const char *s)
{
	if (s)
	{
		ft_putstr(s);
		ft_putchar('\n');
	}
}

char	*ft_strnew(size_t size)
{
	size_t		i;
	char		*str;

	i = 0;
	if (!(str = (char *)malloc(sizeof(char) * size + 1)))
		return (NULL);
	while (i < size)
	{
		str[i] = '\0';
		i++;
	}
	str[i] = '\0';
	return (str);
}

void	ft_putstr(const char *str)
{
	if (str)
		while (*str)
		{
			ft_putchar(*str);
			str++;
		}
}

int		ft_sqrt(int n)
{
	int i;

	i = 0;
	while (i++ < n)
	{
		if (i * i == n)
			return (i);
	}
	return (0);
}

void	ft_putchar(char c)
{
	write(1, &c, 1);
}
